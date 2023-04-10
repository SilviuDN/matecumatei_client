import React from 'react';
import {Container}  from 'react-bootstrap'
import './FooterSection.css';

const FooterSection = ({footerColumnInfo}) => {
    const { title, links } = footerColumnInfo;
  
    const isTwoColumn = links.length >= 5;
  return (
    <>
        <Container>
        <h2 className="footer-section-title">{title}</h2>
        {isTwoColumn ? (
            <div className="two-column">
            <ul className="footer-links-list">
                {links.slice(0, Math.ceil(links.length / 2)).map((link, index) => (
                <li key={index} className="footer-link-item">
                    <a href={link.url} className="footer-link" target="_blank" rel="noopener noreferrer">{link.name}</a>
                </li>
                ))}
            </ul>
            <ul className="footer-links-list">
                {links.slice(Math.ceil(links.length / 2)).map((link, index) => (
                <li key={index} className="footer-link-item">
                    <a href={link.url} className="footer-link" target="_blank" rel="noopener noreferrer">{link.name}</a>
                </li>
                ))}
            </ul>
            </div>
        ) : (
            <ul className="footer-links-list">
            {links.map((link, index) => (
                <li key={index} className="footer-link-item">
                <a href={link.url} className="footer-link" target="_blank" rel="noopener noreferrer">{link.name}</a>
                </li>
            ))}
            </ul>
        )}
        </Container>
    {/* <Container>
        <h2 className="footer-section-title">{footerColumnInfo.title}</h2>
        <ul className="footer-links-list">
            {footerColumnInfo.links.map((link, index) => (
            <li key={index} className="footer-link-item">
                <a href={link.url} className="footer-link" target="_blank" rel="noopener noreferrer">{link.name}</a>
            </li>
            ))}
        </ul>
    </Container> */}
    </>

  );
};

export default FooterSection;