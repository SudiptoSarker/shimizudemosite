import { useState,useEffect } from 'react';
import styles from '../styles/style.module.css';
import Layout from "@/components/site/layout/layout";
import NotificationComponent from "@/components/site/notificationbanner/notificationcomponent";
import SubscriptionButton from "@/components/site/subscriptionbutton/subscriptionbuttoncomponent";
import { fetchSubscriptionLoginData,fetchNotificationsAndAnnouncements } from "@/components/api/queryApi";
import { siteid } from '@/helper/helper';

const HomePage = ({globalData }) => {
    const [notifications, setNotifications] = useState([]);    
    const [subscriptionData, setSubscriptionData] = useState([]);

    const domain = process.env.NEXT_PUBLIC_DOMAIN;

    useEffect(() => {        
        if (domain) {
            const getSiteInformation = async () => {
                try {
                    const siteId = await siteid();     
                                         
                    getSubscriptionData(siteId);                           
                    getNotifications(siteId);                    
                } catch (error) {
                    console.log("Error fetching subscription data:", error);
                }
            };
            
            const getSubscriptionData = async (siteId) => {                
            try {            
                const response = await fetchSubscriptionLoginData(siteId,"SubscriptionOptions");
                setSubscriptionData(response.data);
            } catch (error) {
                console.log("Error fetching subscription data:", error);
            }
            };            

            const getNotifications = async (siteId) => {
                try {
                  const data = await fetchNotificationsAndAnnouncements(siteId,"NotificationSection");                  
                  setNotifications(data.data);
                } catch (error) {
                  console.error("Error fetching notifications:", error);
                }
              };
            getSiteInformation();
        }
    }, [domain]);  

      
  return (
    <Layout globalData={globalData}>  
       <div className={styles.container}>       
            <section className={styles.notification}> 
                {notifications.map((notification, index) => (
                    <NotificationComponent
                    key={index}
                    text={notification.text}
                    href={notification.link}
                    />
                ))}  
            </section>

            <section className={styles.content}>
                <p className={styles.description}>
                ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。ここは説明文を記載します。
                </p>
                
                {(!globalData.auth || (globalData.auth && !globalData.isSubscribed)) && (
                    subscriptionData.map((option, index) => (
                        <SubscriptionButton key={index} data={option} />                    
                    ))
                )}                 
            </section>   
        </div>
    </Layout>
  );
};

export default HomePage;
