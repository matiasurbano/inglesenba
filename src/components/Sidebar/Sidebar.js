import React from 'react';
import { Link, withPrefix, graphql, StaticQuery } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';

export const PureSidebar = ({ data, isIndex }) => {
  const {
    author,
    copyright,
    menu
  } = data.site.siteMetadata;

  const { group } = data.allMarkdownRemark;

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Link to="/">
          <img
            src={withPrefix('logo.png')}
            className={styles['author__photo']}
            alt={author.name}
          />
        </Link>
        {/* <Author author={author} isIndex={isIndex} /> */}
        <Menu menu={menu} />
        <ul>
          {group.map((category) => (
            <li key={category.fieldValue}>
              <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
        {/* <Contacts contacts={author.contacts} /> */}
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export const Sidebar = (props) => (
  <StaticQuery
    query={graphql`
      query SidebarQuery {
        site {
          siteMetadata {
            title
            subtitle
            copyright
            menu {
              label
              path
            }
            author {
              name
              photo
              bio
              contacts {       
                twitter
                telegram
                github
                email
                rss
                vkontakte
              }
            }
          }
        }
        allMarkdownRemark(
          filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
        ) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={(data) => <PureSidebar {...props} data={data}/>}
  />
);

export default Sidebar;
