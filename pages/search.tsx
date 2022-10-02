import type { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout';
import nextI18NextConfig from '../i18n/next-i18next.config.js';
import HotelSearch from '../components/hotels-search';
import HeadSeo from '../components/HeadSeo';
import siteMetadata from '../data/siteMetadata';
import { useRouter } from 'next/router';
import StartsBox from '../components/starts-box';
import { format, addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import SearchHotelCard from '../components/search-hotel-card';
import { useSearchHotels } from '../hooks/useSearchHotels';
import Pagination from '../components/pagination';
import Link from 'next/link';
import LoadingCard from '../components/LoadingCard';
import { useLocalStorage } from 'react-use';
import { useCities } from '../hooks/useCities';
const Search: NextPage<{}> = () => {
  const { t, i18n } = useTranslation([
    'common',
    'search',
    'button',
    'validation',
  ]);

  const cities = useCities();
  const router = useRouter();
  const hotelFetch = useSearchHotels(router.query);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchData, setSearchData] = useState<{
    checkin: string;
    checkout: string;
    city: number;
    promocode: string;
    page: number;
  }>({
    checkin: '',
    checkout: '',
    city: 0,
    promocode: '',
    page: 1,
  });

  const goToSearch = (data: {
    checkin: string;
    checkout: string;
    city: number;
    promocode: string;
    page: number;
  }) => {
    setSearchData({ ...searchData, page: data.page });
    hotelFetch.setSize(data.page);
    router.push({
      pathname: './search',
      query: data,
    });
  };

  const [
    selectedHotelStorage,
    setSelectedHotelStorage,
    removeSelectedHotelStorage,
  ] = useLocalStorage('selectedHotel');

  useEffect(() => {
    setSearchData({
      ...searchData,
      city: router.query.city ? Number(router.query.city) : 1,
      checkin: router.query.checkin
        ? (router.query.checkin as string)
        : format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      checkout: router.query.checkout
        ? (router.query.checkout as string)
        : format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      promocode: router.query.promocode
        ? (router.query.promocode as string)
        : '',
      page: router.query.page ? Number(router.query.page) : 1,
    });
  }, [router.query]);

  return (
    <>
      <HeadSeo
        title={t('common:search-title')}
        description={t('home:sadana')}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={'website'}
      />
      <Layout>
        <section className='w-full pt-16 lg:pt-40 bg-primary-tint'>
          <div className='container mx-auto px-6 lg:px-10'>
            <div className='mb-16'>
              <div className='hidden lg:block'>
                <HotelSearch
                  goToSearch={(data) => goToSearch({ ...data, page: 1 })}
                />
              </div>
              <div className='block lg:hidden pt-16'>
                {!isMobileSearchOpen ? (
                  <div
                    onClick={() => setIsMobileSearchOpen(true)}
                    className={`cursor-pointer bg-white rounded-full px-6 py-2 shadow`}
                  >
                    <div className='flex justify-start items-center gap-2'>
                      <i className='icon-marker-1 text-secondary text-sm'></i>
                      <div>
                        {Number(router.query.city) !== 0 && cities.data
                          ? cities.data.find(
                              (c: any) => c.Id === Number(router.query.city)
                            )?.NameAr
                          : t('common:all-directions')}
                      </div>
                    </div>
                    <div className=' w-full flex items-center justify-between gap-2  '>
                      <div className='flex items-center gap-4 w-1/2'>
                        <div className='text-dark text-sm font-bold '>
                          {searchData.checkin
                            ? new Date(searchData.checkin).toLocaleDateString(
                                i18n.language === 'ar' ? 'ar-eg' : 'en-US',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                }
                              )
                            : t('input:choose-date')}
                        </div>
                      </div>
                      <i className='icon-angle-small-left-1 text-primary self-end text-xxs pb-1.5'></i>
                      <div className='flex items-center justify-end gap-4 w-1/2'>
                        <div className='text-dark text-sm font-bold'>
                          {searchData.checkout
                            ? new Date(searchData.checkout).toLocaleDateString(
                                i18n.language === 'ar' ? 'ar-eg' : 'en-US',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                }
                              )
                            : t('input:choose-date')}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <HotelSearch
                    goToSearch={(data) => {
                      goToSearch({ ...data, page: 1 });
                      setIsMobileSearchOpen(false);
                    }}
                  />
                )}
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-col items-start gap-6 mb-8 relative'>
                {hotelFetch.isLoading ? (
                  <div className='space-y-4 w-full flex flex-col gap-6'>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <LoadingCard key={i} />
                    ))}
                  </div>
                ) : (
                  hotelFetch.data &&
                  hotelFetch.data[hotelFetch.size - 1]?.Data &&
                  hotelFetch.data[hotelFetch.size - 1]?.Data.map(
                    (hotel: any) => (
                      <div
                        key={hotel.Slug}
                        onClick={() => {
                          setSelectedHotelStorage(hotel);
                        }}
                        className='w-full cursor-pointer'
                      >
                        <Link
                          passHref
                          href={{
                            pathname: `/hotels/[slug]`,
                            query: {
                              slug: hotel.Slug,
                              ...router.query,
                            },
                          }}
                        >
                          <div className='h-full'>
                            <SearchHotelCard hotel={hotel} />
                          </div>
                        </Link>
                      </div>
                    )
                  )
                )}
              </div>
              {/* <Pagination /> */}
              {hotelFetch.data &&
                hotelFetch.data?.length > 0 &&
                hotelFetch.data[hotelFetch.size - 1]?.Data?.length > 0 && (
                  <Pagination
                    className='pagination-bar'
                    currentPage={searchData.page}
                    totalCount={
                      hotelFetch.data &&
                      hotelFetch.data[hotelFetch.size - 1].TotalCount
                    }
                    pageSize={12}
                    onPageChange={(page: number) =>
                      goToSearch({
                        city: searchData.city,
                        checkin: searchData.checkin,
                        checkout: searchData.checkout,
                        promocode: searchData.promocode,
                        page: page,
                      })
                    }
                  />
                )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ['common', 'button', 'search', 'input', 'validation'],
        nextI18NextConfig
      )),
    },
  };
};
export default Search;
