const fs = require('fs')

/**
 * List of authors to include in the report. Names can be
 * found for each user with `git config user.name`
 */

const authors = fs.readFileSync('./config/authors.txt')
                  .toString('utf-8')
                  .split('\n')

/**
 * List of repositories to include in the report. All
 * are expected to live under the same root directory.
 */
const repositories = fs.readFileSync('./config/repositories.txt')
                       .toString('utf-8')
                       .split('\n')

// root directory for all repositories
const projectRoot = fs.readFileSync('./config/projectRoot.txt')
                      .toString('utf-8')

module.exports = {
  authors,
  repositories,
  projectRoot
}
