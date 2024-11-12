import { useState,useEffect } from 'react';
import styles from '../styles/demo.module.css';
import Layout from "@/components/site/layout/demolayout";
import NotificationComponent from "@/components/site/notificationbanner/notificationcomponent";
import AnnounceComponent from "@/components/site/announcebanner/announcecomponent";
import SubscriptionButton from "@/components/site/subscriptionbutton/subscriptionbuttoncomponent";
import LoginButton from "@/components/site/loginbutton/loginbuttoncomponent";
import { fetchSubscriptionData,fetchLoginData,fetchNotificationsAndAnnouncements } from "@/components/api/queryApi";
import { siteid } from '@/helper/helper';

const HomePage = ({globalData }) => {
    const [notifications, setNotifications] = useState([]);    
    const [subscriptionData, setSubscriptionData] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [loginData, setLoginData] = useState([]);

    useEffect(() => {        
        getSiteInformation();
    }, []);  

    const getSiteInformation = async () => {
        try {
            const siteId = await siteid();     
            getLoginData(siteId);      
            getSubscriptionData(siteId);                           
            getNotifications(siteId);     
            getAnnouncements(siteId);               
        } catch (error) {
            console.log("Error fetching subscription data:", error);
        }
    };
    
    const getSubscriptionData = async (siteId) => {                
    try {            
        const response = await fetchSubscriptionData(siteId,"SubscriptionOptions");
        setSubscriptionData(response.data);
    } catch (error) {
        console.log("Error fetching subscription data:", error);
    }
    };            
    const getLoginData = async (siteId) => {
        try {            
            const response = await fetchLoginData(siteId,"LoginSection");
            setLoginData(response.data);
        } catch (error) {
            console.log("Error fetching subscription data:", error);
        }
    };
    const getNotifications = async (siteId) => {
        try {
            const data = await fetchNotificationsAndAnnouncements(siteId,"notificationbanner");                  
            setNotifications(data.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };
    const getAnnouncements = async (siteId) => {
        try{
            const data = await fetchNotificationsAndAnnouncements(siteId,"announcebanner");                  
            setAnnouncements(data.data);
        }catch(error) {
            console.error("Error fetching announcements:", error);
        }
    };
      
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
                {announcements.map((announcement, index) => (
                    <AnnounceComponent 
                        key={index}
                        {...announcement}          
                    />
                ))}
            </section>
            
            <section className={styles.content}>
                <p className={styles.description}>
                Lorem Ipsum は、印刷および植字業界のダミー テキストです。Lorem Ipsum は、1500 年代に無名の印刷業者が活字の校正刷りを組み替えてタイプ サンプル帳を作ったときから、業界の標準ダミー テキストとなっています。5 世紀もの間生き延びただけでなく、電子植字への飛躍も生き延び、基本的に変わることなく生き延びています。1960 年代に Lorem Ipsum の文章を含む Letraset シートがリリースされ、さらに最近では、Lorem Ipsum のバージョンを含む Aldus PageMaker などのデスクトップ パブリッシング ソフトウェアによって普及しました。
                </p>
                <br/>
                {(!globalData.auth || (globalData.auth && !globalData.isSubscribed)) && (
                    subscriptionData.map((option, index) => (
                        <SubscriptionButton key={index} data={option} />                    
                    ))
                )}   
                {!globalData.auth && (
                    loginData.map((option, index) => (
                        <LoginButton key={index} data={option} />
                    ))
                )}              
            </section>   
        </div>
    </Layout>
  );
};

export default HomePage;
