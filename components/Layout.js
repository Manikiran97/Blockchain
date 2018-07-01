import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

export default props =>{
    return(
<Container>
    {/*Head tag from nextjs will include the code between the <Head> tg to <head> tag of the final HTML*/}
    <Head>
         {/*This url will help us to import all the css related to semantic-ui components */}
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
    </Head>

    <Header />
        {props.children}
</Container>
);
};