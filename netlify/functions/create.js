exports.handler = async function(event) {
  try {
    const { image, url } = JSON.parse(event.body);
    if (!image || !url) {
      return { statusCode: 400, body: "Missing image or URL." };
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta property="og:title" content="Watch Now!" />
  <meta property="og:description" content="Tap to see full content!" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta http-equiv="refresh" content="0; url=${url}" />
  <title>Redirecting...</title>
</head>
<body style="margin:0">
  <a href="${url}"><img src="${image}" style="width:100%;height:auto;" /></a>
</body>
</html>`;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
