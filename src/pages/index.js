import React from "react";

export const config = { amp: true };
const Index = ({ res }) => {
  return (
    <div>
      <h1> Umami Food Blog </h1>
      <h1>Articles</h1>
      {res
        ? res.data.map((x) => {
          const found = res.included.find(element => element.id == x.relationships.field_media_image.data.id)
          const imgelem = res.included.find(image => image.id == found.relationships.field_media_image.data.id)
             return(
          <>
            <div>
              <h2>{x.attributes.title}</h2>
              <amp-img
                  src={"http://localhost/"+imgelem.attributes.uri.url}
                  width="400"
                   height="350"
                >
                </amp-img>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: x.attributes.body.value }}
            ></div>
            <div>
              <p>{x.relationships.feild_media_image}</p>
            </div>
          </>
          )})
        : null}
    </div>
  );
};

export async function getStaticProps(context) {
  const data = await fetch(`http://localhost/drupal/en/jsonapi/node/article?include=field_media_image.field_media_image`);
  return {
    props: {
      res: await data.json(),
      // res: JSON.parse(JSON.stringify(data.body))
    }, // will be passed to the page component as props
  };
}

export default Index;
