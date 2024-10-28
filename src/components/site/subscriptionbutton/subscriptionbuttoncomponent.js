import React from 'react';
import styles from './subscriptionbutton.module.css';

function SubscriptionButton({ data }) {    
  return (      
    <form id={data.formId} method="post" action={data.submitlink} className={styles.subscriptionForm}>
        <p>        
            <button className={styles.button} type="submit">
            {data.buttonhtml ? (
                <div dangerouslySetInnerHTML={{ __html: data.buttonhtml }} />
            ) : (            
                <>
                <div className={styles.deviceInfo}>                
                    {/* <p className={styles.deviceLabel}>モバイル/PC 合計</p> */}
                    {/* <div className={styles.deviceCount}>
                        <span className={styles.countNumber}>{data.devicecount}</span>
                        <span className={styles.countUnit}>{data.deviceunit}</span>
                    </div> */}
                </div>
                <p className={styles.subscriptionInfo}>月額　 {data.price}円</p>                 
                </>       
            )}
            </button>
        </p>
        <input type="hidden" name="ci" value={data.ci} />
        <input type="hidden" name="act" value={data.act} />
        <input type="hidden" name="nl" value={data.nl} />
        <input type="hidden" name="cl" value={data.cl} />
        <input type="hidden" name="fl" value={data.fl} />
    </form>   
  );
};

export default SubscriptionButton;
