export default function (social, url) {
  const link_socials = {
    fb: 'https://www.facebook.com/sharer.php?u=',
    ok: 'https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=',
    tg: 'https://telegram.me/share/url?url=',
    tw: 'https://twitter.com/intent/tweet?url=',
    vk: 'http://vk.com/share.php?url=',
  };
  const width = 800;
  const height = 400;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  window.open(
    `${link_socials[social]}${url ? url : window.location}`,
    'Share',
    `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`,
  );
}