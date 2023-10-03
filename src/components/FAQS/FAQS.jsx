import React from 'react';
import "./FAQS.css"
import faqguitar from "../../images/faq-guitar.jpg"

const FAQS = () => {
    return(
        <div className='FAQS' >
            <div>
                <h1>FAQs</h1>
            </div>
            <div className='faq-image' >
                <img src={faqguitar}  />
                <h2>Frequently asked question</h2>
            </div>
            <div className='qna'>
                <h2 className='question'>How do Sounds Credit works ? </h2>
                <p className='answer'> <br />  N ON CONTRACTS FOR THE INTERNATIONAL SALE OF GOODS IS EXPRESSLY EXCLUDED FROM THIS AGREEMENT AND SHALL NOT APPLY IN ANY INSTANCE. <br /> Introduction and Eligibility <br /> Please read these Terms carefully before using the Service. Your use of, and participation in, the Service may be subject to additional terms for specific Splice products, including, without limitation, Splice Studio, or tools such as Splice Plug-Ins, as further described below ("Supplemental Terms"), such as, but not limited to, the terms and conditions set forth in the Splice Studio & Community Terms of Use. Such Supplemental Terms will either be listed in these Terms or will be presented to you for your acceptance when you sign up to use the supplemental features of the Service. Without limiting the foregoing, certain materials, tools, or components of the Service made available through the Service (including premium add-ons and Plug-Ins) may be subject to license terms and conditions that are different from those set forth herein. Any such terms and conditions will be identified for such materials, tools, or components of the Service, and by downloading same, you agree to be bound by and comply with such Supplemental Terms. <br /> If any provision in these Terms is inconsistent with any provision in the Supplemental Terms, the provision in the Supplemental Terms shall control with respect to the applicable Service for which the Supplemental Terms have been provided. The Terms and any applicable Supplemental Terms are hereinafter referred to herein as the "Agreement." <br/><br/> <strong>1. Revisions to the Agreement </strong> <br/><br/> WE RESERVE THE RIGHT TO CHANGE THE AGREEMENT AT ANY TIME, IN OUR SOLE DISCRETION. PLEASE CHECK THESE TERMS PERIODICALLY FOR CHANGES. When changes are made, Splice will make a new copy of the Agreement available on the Website and within the Apps, or otherwise posted through the Services. We will also update the "Last Updated" date at the top of the Agreement. Any changes to the Agreement will be effective immediately for new users of the Service and on the stated Effective Date for existing Users (collectively, "Users"). Splice may require you to consent to the updated Agreement in a specified manner before further use of the Service is permitted. In the event you do not agree to any change(s) after receiving such notice thereof, you must stop using the Service. Otherwise, your continued use of the Service constitutes your acceptance of such change(s). <br/><br/> <strong> 2. Eligibility</strong>  <br/><br/> You must be at least 18 years old to use the Service. By accessing or using the Service or otherwise agreeing to these Terms, you represent and warrant to us that: (a) you are at least 18 years old; (b) you have not previously been suspended or removed from the Service; and (c) your use of the Service is in compliance with any and all applicable laws and regulations. If you are an individual representative of an entity, organization, or company, you represent and warrant that you have authority to bind such entity, organization, or company to the Agreement.</p>
            </div>
           </div>
    )

}

export default FAQS;