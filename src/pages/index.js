import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Call from '../components/Call';

const Home = props => {
  const intro = props.data.intro;
  const site = props.data.site.siteMetadata;
  const team = props.data.team.edges;
  const services = props.data.services.edges;
  const features = props.data.features.edges;
  const introImageClasses = `intro-image ${intro.frontmatter.intro_image_absolute && 'intro-image-absolute'}
                                         ${intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'}`;
  
  
return (
    <Layout bodyClass="page-home">
      <Helmet>
        <meta
          name="Seahorse Safe"
          content="Leading locksmith and safe technician in Colorado."
        />
      </Helmet>

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-12 col-lg-6 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
              <Call showButton />
            </div>
            {intro.frontmatter.intro_image && (
              <div className="col-12 col-md-5 col-lg-6 order-1 order-md-2 position-relative">
                <img alt={intro.frontmatter.title} className={introImageClasses} style={{maxWidth: '700px'}} src={intro.frontmatter.intro_image} />

              </div>
            )}
          </div>
        </div>
      </div>
    
      <div className="row">
        {team.filter(edge => (edge.node.frontmatter.promoted)).map(({ node }) => (
          <div key={node.id} className="col-12 col-md-12 mb-2">
            <div className="team team-summary team-summary-large">
              {node.frontmatter.image && (
                <div className="team-image">
                  <img alt={`photo of ${node.frontmatter.title}`} className="img-fluid mb-2" src={node.frontmatter.image} />
                </div>
              )}
              <div className="team-meta">
                <h2 className="team-name">{node.frontmatter.title}</h2>
                <p className="team-description">{node.frontmatter.jobtitle}</p>
                {node.frontmatter.linkedin && (
                  <a target="_blank" href="{{ .Params.Linkedinurl }}">LinkedIn</a>
                )}
              </div>
              <div className="team-content">
                <p>{node.excerpt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>   
      {services.length > 0 && (
        <div className="strip">
          <div className="container pt-6 pb-6 pb-md-10">
            <div className="row justify-content-start">
              {services.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-4 mb-1">
                  <div className="service service-summary">
                    <div className="service-content">
                      <h2 className="service-title">
                        <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                      </h2>
                      <p>{node.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <Link className="button button-primary" to="/services/">View All Services</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {features.length > 0 && (
        <div className="strip strip-grey">
          <div className="container pt-6 pb-6 pt-md-10 pb-md-10">
            <div className="row justify-content-center">
              {features.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-6 col-lg-4 mb-2">
                  <div className="feature">
                    {node.image && (
                      <div className="feature-image">
                        <img src={node.image} />
                      </div>
                    )}
                    <h2 className="feature-title">{node.title}</h2>
                    <div className="feature-content">{node.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
};

export const query = graphql`
  query {
    services: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/services\/.*/" } }
      sort: { fields: [frontmatter___weight], order: ASC }
      limit: 6
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    intro: markdownRemark(
      fileAbsolutePath: {regex: "/content/index.md/"}
    ) {
        html
        frontmatter {
          image
          intro_image
          intro_image_absolute
          intro_image_hide_on_mobile
          title
        }
    }
    features: allFeaturesJson {
      edges {
        node {
          id
          title
          description
          image
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }

    team: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/team\/.*/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 1000)
          fields {
            slug
          }
          frontmatter {
            title
            promoted
            image
            jobtitle
            linkedinurl
          }
        }
      }
    }
    
  }
  
`;



export default Home;
