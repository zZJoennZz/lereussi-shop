import Head from 'next/head'
import { MetaType } from '../types'

//for testing
import ogImg from '@/img/carousel1.jpg'

export default function Meta(MetaData: MetaType) {
    return (
        <Head>
            <title>{MetaData.title || 'Le REUSSI'}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="UTF-8" />
            <meta name="title" content={MetaData.title || 'Le REUSSI'} />
            <meta name="description" content={MetaData.metaDescription || 'Started off as a hobby in family gatherings, Le Reussi is a quaint cakes and drinks cafe right along Banawe. After your fill of chinese food in this area, satisfy your belly with some desserts.'} />
            <meta name="keywords" content={MetaData.keywords || 'cakes,drinks,cafe'} />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="30 days" />
            <meta name="author" content={MetaData.author || 'le REUSSI'} />
            <meta property="og:title" content={MetaData.title || 'Le REUSSI'} />
            <meta property="og:description" content={MetaData.metaDescription || 'Started off as a hobby in family gatherings, Le Reussi is a quaint cakes and drinks cafe right along Banawe. After your fill of chinese food in this area, satisfy your belly with some desserts.'} />
            <meta property="og:image" content={ogImg.src} />
            <meta property="og:url" content={ogImg.src} />
        </Head>
    )
}