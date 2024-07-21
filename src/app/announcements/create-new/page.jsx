import dynamic from 'next/dynamic';
const AnnouncementCardForm = dynamic(
  () => import('@/components/announcements/AnnouncementCardForm'),
  { ssr: false } 
);
const CreateNewAnnouncementWrapper = () => (
  <>
    <AnnouncementCardForm />
  </>
);

export default CreateNewAnnouncementWrapper;
