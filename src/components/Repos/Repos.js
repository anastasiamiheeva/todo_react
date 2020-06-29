import React from 'react';
import classnames from 'classnames';
import { Octokit }  from '@octokit/rest';
import styles from './Repos.module.css';
import Card from '@material-ui/core/Card';

const octokit = new Octokit();

class Repos extends React.Component {
  state = {
    fetchReposFailure: false,
    repoList: [],
    firstRepo: 0,
    lastRepo: 4
  }
  componentDidMount() {
    octokit.repos.listForUser({
      username: 'anastasiamiheeva'
    }).then(({ data }) => {
      this.setState({
        fetchReposFailure: false,
        repoList: data
      })
    }).catch(err => {
      this.setState({
        fetchReposFailure: true
      })
    })
  }

  previousPage = () => {
    if (this.state.firstRepo !== 0 ) {
        this.setState( state => ({
          firstRepo: state.firstRepo - 4,
          lastRepo: state.lastRepo - 4
        })); 
    }
  };

  nextPage = () => {
    if(this.state.lastRepo < this.state.repoList.length) {
      this.setState( state => ({
        firstRepo: state.firstRepo + 4,
        lastRepo: state.lastRepo + 4
      }));
    }
  };

  render() {
    const {fetchReposFailure, repoList, firstRepo, lastRepo} = this.state;
    const repoPag = repoList.slice(firstRepo, lastRepo);
    return (
      <div>
        {!fetchReposFailure
          ? <Card className={styles.repo_wrap}>
            <p classnames={styles.text}>Список репозиториев:</p>
            <ol className={styles.list}>
            {repoPag.map(repo => (
              <li
                className={styles.list_item}
                key={repo.id}
              >
                <a 
                  className={styles.repo_link}
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer' 
                >{repo.name}</a>
                <div className={styles.repo_info}>
                  <span className={classnames({
                    [styles.language]: true,
                    [styles.html]: repo.language === 'HTML',
                    [styles.css]: repo.language === 'CSS',
                    [styles.js]: repo.language === 'JavaScript'
                  })}>
                    {repo.language}
                  </span>
                  <span className={styles.fork}>{repo.forks_count}</span>
                  <span className={styles.star}>{repo.stargazers_count}</span>
                  <span className={styles.date}>updated: {new Date(repo.updated_at).toLocaleString('en-US',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                  </span>
                </div>
              </li>
            ))}
          </ol>
            <div className={styles.pagination}>
              <button
                className={styles.pagination_btn}
                onClick={this.previousPage}
                disabled={firstRepo < 4}
              >назад
              </button>
              <button
                className={styles.pagination_btn}
                onClick={this.nextPage}
                disabled={repoList.length < lastRepo}
              >вперед
              </button>
            </div>
          </Card>
        : <div><p>Репозитории не найдены</p></div>
        }
      </div>
    )
  }
}


export default Repos;