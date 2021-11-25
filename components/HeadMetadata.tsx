import Head from "next/head";

function HeadMetadata(props: any) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="a cozy nook for your books" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph meta tags */}
      <meta property="og:site_name" content="BookNook" />
      <meta property="og:title" content="BookNook" />
      <meta property="og:description" content="a cozy nook for your books" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
    </Head>
  );
}

export default HeadMetadata;
