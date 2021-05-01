import React from "react";
import Head from "next/head";
import styles from "../../styles/Layout.module.css";

import { Typography, Card, Container, StylesProvider } from "@material-ui/core";

// export const config = { amp: "hybrid" };
export const config = { amp: true };
const Index = ({ res }) => {
  return (
    <>
      <Container style={{ padding: "4px" }}>
        <Head>
          <title> Pre-Rendered Food Blog</title>
        </Head>

        <h1>Articles</h1>
        {res
          ? res.data.map((x) => {
              const found = res.included.find(
                (element) =>
                  element.id == x.relationships.field_media_image.data.id
              );
              const imgelem = res.included.find(
                (image) =>
                  image.id == found.relationships.field_media_image.data.id
              );
              return (
                <>
                  <div className={styles.blogposts}>
                    <div>
                      <h2>{x.attributes.title}</h2>
                    </div>
                      <amp-img
                        width="300"
                        height="300"
                        src={
                          "https://dev-umamiold.pantheonsite.io/" +
                          imgelem.attributes.uri.url
                        }
                        alt="a cool image"
                        layout="responsive"
                      />

                    <div
                      dangerouslySetInnerHTML={{
                        __html: x.attributes.body.value,
                      }}
                    ></div>
                    <div>
                      <p>{x.relationships.feild_media_image}</p>
                    </div>
                  </div>
                </>
              );
            })
          : null}
      </Container>
    </>
  );
};

export async function getStaticProps(context) {
  const data = await fetch(
    `https://dev-umamiold.pantheonsite.io/jsonapi/node/article?include=field_media_image.field_media_image`
  );
  return {
    props: {
      res: await data.json(),
      // res: JSON.parse(JSON.stringify(data.body))
    }, // will be passed to the page component as props
    revalidate: 1,
  };
}

export default Index;
