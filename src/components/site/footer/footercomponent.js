import { useState,useEffect } from 'react';
import React from 'react';
import styles from './footer.module.css';
import { fetchFooterSection } from "@/components/api/queryApi";
import { siteid } from '@/helper/helper';

const Footer = () => {
  const [footerData, setFooterData] = useState([]);
  const domain = process.env.NEXT_PUBLIC_DOMAIN;  
  useEffect(() => {        
      if (domain) {
          const getSiteInformation = async () => {
              try {
                  const siteId = await siteid();     
                                       
                  getFooterData(siteId);                        
              } catch (error) {
                  console.log("Error fetching subscription data:", error);
              }
          };
          
          const getFooterData = async (siteId) => {                
          try {            
              const response = await fetchFooterSection(siteId,"FooterLine");
              const mappedData = response.data.map(item => ({
                id: item.id,
                text: item.text,
                url: item.link, // Change 'link' to 'url' for consistency
            }));
            setFooterData(mappedData);
          } catch (error) {
              console.log("Error fetching subscription data:", error);
          }
          };

          getSiteInformation();
      }
  }, [domain]);  
  console.log('footerData: ',footerData);
  return (
    <footer className={styles.footer}>
        {footerData.map((link) => (
            <p key={link.id}> {/* Use id as the key for better uniqueness */}
                <a href={link.url} className={styles.footerLink}>
                    {link.text}
                </a>
            </p>
        ))}
    </footer>     
  );
};

export default Footer;