import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import styles from './Menu.module.scss';

const PureMenu = ({ data }) => {
  const { edges } = data.allMarkdownRemark;

  const pages = edges
    .map(edge => ({
      label: edge.node.frontmatter.title,
      path: edge.node.fields.slug,
    }));

return (
  <nav className={styles['menu']}>
    {/* <b>Menu</b> */}
    <ul className={styles['menu__list']}>
      {pages.map((item) => (
        <li className={styles['menu__list-item']} key={item.path}>
          <Link
            to={item.path}
            className={styles['menu__list-item-link']}
            activeClassName={styles['menu__list-item-link--active']}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
}

export const Menu = (props) => (
  <StaticQuery
    query={graphql`
      query MenuQuery {
        allMarkdownRemark(filter: {frontmatter: {template: {eq: "page"}, draft: {ne: true}}}) {
          edges {
            node {
              frontmatter {
                title
                slug
                category
                template
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={(data) => <PureMenu {...props} data={data} />}
  />
);

export default Menu;
