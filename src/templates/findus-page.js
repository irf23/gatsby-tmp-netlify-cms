import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import { getImage } from "gatsby-plugin-image";

// eslint-disable-next-line
export const FindusPageTemplate = ({
    image,
    title,
    heading,
    content,
    contentComponent,
  }) => {
    const PageContent = contentComponent || Content;
    const heroImage = getImage(image) || image;

    return (
        <div>
          <FullWidthImage img={heroImage} title={title} heading={heading}/>
          <section className="section">
            <div className="container">
              <div className="content">
              <PageContent className="content" content={content} />
              </div>
            </div>
          </section>
          </div>
      );
  };  

  FindusPageTemplate.propTypes = {
    title: PropTypes.string,
    heading: PropTypes.string,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),  
  };
  
  const FindusPage = ({ data }) => {
    const { markdownRemark: post } = data;
  
    return (
      <Layout>
        <FindusPageTemplate
          image={post.frontmatter.image}
          title={post.frontmatter.title}
          heading={post.frontmatter.heading}
          content={post.html}
          contentComponent={HTMLContent}
        />
      </Layout>
    );
  };
  
  FindusPage.propTypes = {
    data: PropTypes.object.isRequired,
  };
  
  export default FindusPage;

  export const findusPageQuery = graphql`
  query FindusPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH,)
          }
        }
        heading
      }
    }
  }
`;