import React from 'react';
import styles from './subscriptionbutton.module.css';
import Cookies from 'js-cookie';

function SubscriptionButton({ data }) {
  const handleSubscription = () => {
    console.log('Subscription button clicked');
  };
  
  return (  
    <form id={data.formId} method="post" action={data.submitlink}>    
      <p>        
        <button className={styles.button} type="submit" onClick={handleSubscription}>
          {data.buttonhtml && data.buttonhtml.trim() !== 'null' ? (
            <div dangerouslySetInnerHTML={{ __html: data.buttonhtml }} />
          ) : (            
            <>
              <div className={styles.deviceInfo}>                
                <p className={styles.deviceLabel}>モバイル/PC 合計</p>
                <div className={styles.deviceCount}>
                  <span className={styles.countNumber}>{data.devicecount}</span>
                  <span className={styles.countUnit}>{data.deviceunit}</span>
                </div>
              </div>
              <p className={styles.subscriptionInfo}>月額利用登録 {data.price}円 (税込)</p> 
            </>       
          )}
        </button>
      </p>
      
      <input type="hidden" name="ci" className={styles.hiddenInput} value={data.ci} />
      <input type="hidden" name="act" className={styles.hiddenInput} value={data.act} />
      <input type="hidden" name="nl" className={styles.hiddenInput} value={data.nl} />
      <input type="hidden" name="cl" className={styles.hiddenInput} value={data.cl} />
      <input type="hidden" name="fl" className={styles.hiddenInput} value={data.fl} />

        {/* <input type="hidden" name="ci" value="R000002750" />                
        <input type="hidden" name="act" value="reg" />
        <input type="hidden" name="nl" value="https://stgbanglalms.mopita.com/member" />
        <input type="hidden" name="cl" value="https://stgbanglalms.mopita.com/top" />
        <input type="hidden" name="fl" value="https://stgbanglalms.mopita.com/top" /> */}

    </form>
  );
};

export default SubscriptionButton;
