import toast from 'react-hot-toast';

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Copied to clipboard');
    })
    .catch((error) => {
      toast.error('Error copying to clipboard. ' + error.message);
    });
};

export default copyToClipboard;
