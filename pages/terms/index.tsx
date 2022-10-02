import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout';
import nextI18NextConfig from '../../i18n/next-i18next.config';
import HeadSeo from '../../components/HeadSeo';
import siteMetadata from '../../data/siteMetadata';

const TermsOfUse: NextPage = () => {
  const { t, i18n } = useTranslation([
    'common',
    'search',
    'button',
    'search',
    'input',
    'terms',
  ]);

  return (
    <>
      <HeadSeo
        title={t('terms:terms-of-use')}
        description={t('home:sadana')}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={'website'}
      />
      <Layout>
        <div className='bg-secondary-tint pt-16 lg:pt-20' dir='ltr'>
          <section className='bg-white py-24'>
            <div className='container mx-auto px-6 sm:px-12 sm:mx-auto flex flex-col gap-9 '>
              <h1 className='text-5xl font-bold text-black'>
                Terms and Conditions
              </h1>

              <ul className='list-disc list-inside space-y-2 '>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Rates are per unit per room per night.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Check-In and Check-Out are subject to the hotel policy and
                  seasons. The standard Check-In time is after 17:00 hrs, and
                  the standard Check-Out time is before 12:00 hrs.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Late Check-out is subject to the hotel availability and may be
                  subject to additional fees.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Groups reservations has to be confirmed before the check-in
                  date by advance payment as per the payment conditions stated
                  in the confirmation letter.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Children number and ages are subject to the hotel policy. The
                  standard is only two children up to 6 years old are free in
                  rooms without beds and getting free meals with their parents.
                  Children from 7 to 12 years old are free in rooms without beds
                  and are getting 50% discount on meals with a maximum of two
                  children sharing parents room.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  All meals for groups must be booked 7 days before check-in
                  dates in advance; otherwise published meal rates will be
                  applied.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Sadana Tourism has the right to change the rates
                  without any prior notice.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Full payment must be done before the option date to avoid any
                  cancellation.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Transactions will in AED including all taxes and fees (VAT +
                  Municipality fees) and subject to transaction and exchange
                  fees.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Sadana Tourism FZ LLC maintains SadanaTourism.com.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  TOur country of domicile is UAE, and stipulate that the
                  governing law is the local law.
                </li>
                <li className='list-disc text-base  text-dark list-item list-inside'>
                  Visa, Master Card, SAR, USD and AED will be accepted for
                  payments.
                </li>
              </ul>

              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  Individuals Cancellation Policy
                </h2>

                <ul className='list-disc list-inside space-y-2'>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Before the option date no cancellation fees will be charged.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    After option date fully stay will be charged.
                  </li>
                </ul>
              </div>

              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  Group Cancellation Policy
                </h2>

                <ul className='list-disc list-inside'>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    From 30 till 15 nights before check-in date no cancellation
                    fees will be charged.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    15 to 10 nights first night will be charged.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    In case of cancellation for less than 10 nights before
                    check-in date fully stay will be charged.
                  </li>
                </ul>
              </div>

              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  No Show Policy
                </h2>

                <ul className='list-disc list-inside space-y-2'>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    In case of no show; fully stay amount will be charged and
                    will not be refundable or exchangeable.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    In case of late arrival; previous night is not refundable or
                    exchangeable and will not be used to extend the stay.
                  </li>
                </ul>
              </div>

              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  Refund Policy
                </h2>

                <ul className='list-disc list-inside space-y-2'>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    In case of refund; transaction and exchange fees (if
                    applicable) will be at the charge of the client.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Refunds may take up to 45 days to process depending on the
                    issuing bank of the credit card.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Refunds will be made onto the original mode payment.
                  </li>
                </ul>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>About us </h2>

                <ul className='list-disc list-inside space-y-2'>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Sadana Tourism provide you the best rates available
                    in Makkah and Madinah.
                  </li>
                </ul>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  Privacy Policy
                </h2>

                <ul className='list-disc list-inside space-y-2'>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Sadana Tourism ensures that all credit/debit cards
                    details and personally identifiable information will NOT be
                    stored, sold, shared, rented or leased to any third parties.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Sadana Tourism will not pass any debit/credit card
                    details to third parties.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Sadana Tourism takes appropriate steps to ensure date
                    privacy and security including through various hardware and
                    software methodologies. However, SadanaTourism.com cannot
                    guarantee the security of any information that is disclosed
                    online.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Sadana Tourism is not responsible for the privacy
                    policies of websites to which itlinks. If you provide any
                    information to such third parties different rules regarding
                    the collection and use of your personal information may
                    apply. You should contact these entities directly if you
                    have any questions about their use of the information that
                    they collect.
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Sadana Tourism Policies and Terms & Conditions may be
                    changed or updated occasionally to meet the requirement and
                    standards. Therefore, the Customers are encouraged to
                    frequently visit these sections to be updated about the
                    changes on the website. Modifications will be effective on
                    the day they are posted.
                  </li>
                </ul>
              </div>

              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  Multiple Bookings
                </h2>

                <ul className='list-disc list-inside space-y-2'>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    The multiple Bookings may result in multiple postings to the
                    cardholder s monthly statement.
                  </li>
                </ul>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  {
                    "The multiple Bookings may result in multiple postings to the cardholder 's monthly statement."
                  }
                </h2>

                <ul className='list-disc list-inside space-y-2'>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Once the payment is made, the confirmation notice will be
                    sent to the client via email within 48 hours of receipt of
                    payment.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ['common', 'search', 'button', 'search', 'input', 'terms'],
        nextI18NextConfig
      )),
    },
  };
};

export default TermsOfUse;
