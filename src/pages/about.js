import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Layout.module.css";
import { Typography, Card, Container, StylesProvider } from "@material-ui/core";
// export const config = { amp: true };
const Recipe = ({ res }) => {
  return (
    <Container style={{ padding: "4px" }}>
      <div>
        <Head>
          <title> Recipe </title>
        </Head>
        <h1> Recipe Page </h1>
        {res
          ? res.data.map((y) => {
              const found = res.included.find(
                (element) =>
                  element.id == y.relationships.field_media_image.data.id
              );
              const imgelem = res.included.find(
                (image) =>
                  image.id == found.relationships.field_media_image.data.id
              );
              return (
                <>
                  <div className={styles.blogposts}>
                    <div>
                      <h2>{y.attributes.title}</h2>
                      <h3>
                        Cooking time: {y.attributes.field_cooking_time}
                      </h3>{" "}
                      <h3>Cooking Difficulty: {y.attributes.field_difficulty}</h3>
                      <h3>
                        Preperation Time: {y.attributes.field_preparation_time}
                      </h3>{" "}
                      <h3>
                        Number of serving:{" "}
                        {y.attributes.field_number_of_servings}
                      </h3>
                      <amp-img
                       width="600"
                       height="400"
                        src={
                          "https://dev-umamiold.pantheonsite.io/" +
                          imgelem.attributes.uri.url
                        }
                        
                      ></amp-img>
                    </div>

                    <div className={styles.recipe}>
                      <h3>Ingredients</h3>
                      <ul>
                        {y.attributes.field_ingredients.map((p) => (
                          <li>
                            <a style={{ color: "black" }}>{p}</a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.instructions}>
                      <h3>Recipe instruction</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: y.attributes.field_recipe_instruction.value,
                        }}
                      ></div>
                    </div>
                  </div>
                </>
              );
            })
          : null}
      </div>
    </Container>
  );
};

export async function getStaticProps(context) {
  const data = await fetch(
    `https://dev-umamiold.pantheonsite.io/jsonapi/node/recipe?include=field_media_image.field_media_image`
  );
  return {
    props: {
      res: await data.json(),
      // res: JSON.parse(JSON.stringify(data.body))
    }, // will be passed to the page component as props
  };
}

export default Recipe;
