import React, { Component } from 'react';
import './Footer.css';
import { Row, Col } from 'react-bootstrap';
import FooterSection from './FooterSection';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visibleThreshold = 50; // tweak this value as needed
    if (currentScrollPos > visibleThreshold) {
      this.setState({ hidden: true });
    } else {
      this.setState({ hidden: false });
    }
  };

  render() {
    const { hidden } = this.state;
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

    return (
      <footer className={`footerStyle footerPositioning ${hidden ? 'footer-fade-out hidden' : ''}`}>
        <Row>
          <Col xs={12} md={3}>
            Perseverența duce la inspirație.
            {/* Perseverance leads to inspiration. */}
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
    );
  }
}

export default Footer;
