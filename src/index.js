const { execSync } = require('child_process')
const moment = require('moment')

const {
  authors,
  repositories,
  projectRoot
} = require('./config')

const lastWeek = moment().subtract(1, 'week').format('MM[/]DD[/]YYYY')

let commits = ""
repositories.forEach(function(repo) {
  console.log('Pulling stats for:', repo)
  execSync('git checkout master && git pull --rebase', {
    cwd: `${projectRoot}${repo}`
  })
  const str = execSync(`git log --format="%an%n%cr%n%s" --since="${lastWeek}"`, {
    cwd: `${projectRoot}${repo}`
  }).toString()
  commits = commits.concat(str)
})

let author

const byAuthor = commits.trim().split('\n').reduce(function(map, fragment, index) {
  if (index % 3 === 0) {
    author = fragment

    if (!map[author] && authors.includes(author)) {
      map[author] = []
    }
  }
  else if (index % 3 === 1 && authors.includes(author)) {
    map[author].push({ date: fragment })
  }
  else if (index % 3 === 2 && authors.includes(author)) {
    map[author][map[author].length-1].subject = fragment
  }

  return map
}, {})

console.log('WEEKLY COMMITS - ' + moment().format('[Week ]W[ of ]Y') + ` (${lastWeek})`)
console.log()

Object.keys(byAuthor).forEach(author => {
  console.log(`${author}`)
  console.log(`${Array(author.length+1).join('-')}`)

  byAuthor[author].forEach(({ date, subject }) => {
    console.log(`(${date})\t${subject}`)
  })

  console.log('\n')
})

