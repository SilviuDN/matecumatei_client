import React from 'react';
import './Footer.css'
import { Row, Col } from 'react-bootstrap';
import FooterSection from './FooterSection';



const Footer = () => {

    const footerSections = [
        {
          title: 'Creatori',
          links: [
            {
              name: 'Despre Noi',
              url: 'https://academia.matecumatei.ro/despre-noi/',
            },
            {
              name: 'Blog',
              url: 'https://academia.matecumatei.ro/blog/',
            },
            {
              name: 'Contact',
              url: 'https://academia.matecumatei.ro/contact/',
            },
          ],
        },
        {
          title: 'Linkuri utile',
          links: [
            // {
            //   name: 'My Account',
            //   url: '',
            // },
            // {
            //   name: 'Cursuri',
            //   url: '',
            // },
            {
              name: 'Întrebări frecvente',
              url: 'https://academia.matecumatei.ro/faqs/',
            },
            {
              name: 'Politica de confidențialitate',
              url: 'https://academia.matecumatei.ro/politica-de-confidentialitate/',
            },
            {
              name: 'Termeni și condiții',
              url: 'https://academia.matecumatei.ro/termeni-si-conditii/',
            },
            // {
            //   name: 'WolframAlpha',
            //   url: 'https://www.wolframalpha.com/',
            // },
          ],
        },
        {
          title: 'Rețele sociale',
          links: [
            {
              name: 'Instagram',
              url: 'https://www.instagram.com/matecumatei/',
            },
            {
              name: 'Facebook',
              url: 'https://www.facebook.com/MateCuMatei/',
            },
            {
              name: 'YouTube',
              url: 'https://www.youtube.com/matecumatei/playlists',
            },
            {
              name: 'LinkedIn',
              url: 'https://www.linkedin.com/in/silviu-dilimot/',
            },
            {
              name: 'Twitter',
              url: 'https://twitter.com/MateiCu',
            },
          ],
        },
      ];
      

    // const style = { background: '#212529', color: 'white', textAlign: 'center', fontSize: '.7em', position: 'fixed', bottom: 0, padding: 5, width: '100%' }

    return (
        // <footer style={style}>Perseverence leads to inspiration.</footer>
        // <footer className="footerStyle footerPositioning">Perseverence leads to inspiration.</footer>
        <footer className="footerStyle footerPositioning">
            <Row>
            <Col xs={12} md={3}>
                Perseverance leads to inspiration.
            </Col>
            <Col xs={12} md={6} className="offset-md-3">
                <Row>
                {footerSections.map((section, index) => (
                    <Col xs={12} md={4} key={index}>
                        <FooterSection footerColumnInfo={section} />
                    </Col>
                ))}
                </Row>
            </Col>
            </Row>
        </footer>
    )
}

export default Footer