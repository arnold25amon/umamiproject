import React from "react";

export const config = { amp: true };
const Recipe = ({ res }) => {
  return (
    <div>
      <h1> Recipe Page </h1>
      {res
        ? res.data.map((y) => { 
          const found = res.included.find(element => element.id == y.relationships.field_media_image.data.id)
          const imgelem = res.included.find(image => image.id == found.relationships.field_media_image.data.id)
         return(
            <>
              <div>
                <h2>{y.attributes.title}</h2>
                <p>Cooking time: {y.attributes.field_cooking_time}</p>{" "}
                <p>Cooking Difficulty: {y.attributes.field_difficulty}</p>
                <p>
                  Preperation Time: {y.attributes.field_preparation_time}
                </p>{" "}
                <p>
                  Number of serving: {y.attributes.field_number_of_servings}
                </p> 
                <amp-img
                  src={"http://localhost/"+imgelem.attributes.uri.url}
                  width="400"
                   height="350"
                >
                </amp-img>
              </div>

              <div>
                <h3>Ingredients</h3>
                <ul>
                  {y.attributes.field_ingredients.map((p) => (
                    <li>
                      <a>{p}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <h3>Recipe instruction</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: y.attributes.field_recipe_instruction.value,
                }}
              ></div>
            </>
          )
        })
        : null}
    </div>
  );
};

export async function getStaticProps(context) {
  const data = await fetch(`https://dev-umamiold.pantheonsite.io/jsonapi/node/recipe?include=field_media_image.field_media_image`);
  return {
    props: {
      res: await data.json(),
      // res: JSON.parse(JSON.stringify(data.body))
    }, // will be passed to the page component as props
  };
}

export default Recipe;
