const calltoApi = async (query, values) => {
    try {
        const response = await fetch("/api/db", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ query, values }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};
export const getSiteId = async (domain) => {
    const siteIdQuery = `SELECT id FROM [dbo].[sites] WHERE name LIKE '%${domain}'`;
    const siteIdResult =  await calltoApi(siteIdQuery, []);    
    return siteIdResult;    
}

export const getSubscribedData = async (siteid, muid) => {
    const query = `SELECT * FROM [dbo].[membertable] WHERE siteid='${siteid}' AND muid='${muid}' AND status=1`;
    return await calltoApi(query,[]);
}

export const fetchSubscriptionData = async (siteId, sectionname) => {
    try {
        if (!siteId) {
            throw new Error(`Site with name '${sitename}' not found.`);
        }
        const subscriptionQuery = `SELECT * FROM [dbo].[${siteId}_subscriptiondata] WHERE section = '${sectionname}'`;        
        const subscriptionResult = await calltoApi(subscriptionQuery,[]);
        return subscriptionResult;

    } catch (error) {
        console.error('Error fetching subscription data:', error);
        throw error;
    }
};

export const fetchLoginData = async (siteId, sectionname) => {
    try {
        if (!siteId) {
            throw new Error(`Site with name '${sitename}' not found.`);
        }
        const subscriptionQuery = `SELECT * FROM [dbo].[${siteId}_logindata] WHERE section = '${sectionname}'`;        
        const subscriptionResult = await calltoApi(subscriptionQuery,[]);
        return subscriptionResult;

    } catch (error) {
        console.error('Error fetching subscription data:', error);
        throw error;
    }
};
export const fetchNotificationsAndAnnouncements = async (siteId, sectionname) => {
    const query = `SELECT * FROM [dbo].[${siteId}_textlinks] WHERE section = '${sectionname}'`;    
    const values = [];
    return await calltoApi(query,values);
};
export const fetchFooterSection = async (siteId, sectionname) => {    
    const query = `SELECT * FROM [dbo].[${siteId}_textlinks] WHERE section LIKE '${sectionname}%'`;    
    const values = [];
    return await calltoApi(query,values);
};