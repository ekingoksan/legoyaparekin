// ========================================================
type SocialLinksProps = { className?: string, socialMedia: any };
// ========================================================

export default function SocialLinks({ className = "nav social social-white mt-4", socialMedia }: SocialLinksProps) {

  return (
    <nav className={className}>
      {
        socialMedia?.facebook && (
          <a href={`https://facebook.com/${socialMedia?.facebook}`} target="_blank" rel="noreferrer">
            <i className="uil uil-facebook-f" />
          </a>
        )
      }

      {
        socialMedia?.instagram && (
          <a href={`https://instagram.com/${socialMedia?.instagram}`} target="_blank" rel="noreferrer">
            <i className="uil uil-instagram" />
          </a>
        )
      }

      {
        socialMedia?.twitter && (
          <a href={`https://twitter.com/${socialMedia?.twitter}`} target="_blank" rel="noreferrer">
            <i className="uil uil-twitter" />
          </a>
        )
      }

      {
        socialMedia?.linkedin && (
          <a href={`https://linkedin.com/${socialMedia?.linkedin}`} target="_blank" rel="noreferrer">
            <i className="uil uil-linkedin" />
          </a>
        )
      }

      {
        socialMedia?.youtube && (
          <a href={`https://youtube.com/${socialMedia?.youtube}`} target="_blank" rel="noreferrer">
            <i className="uil uil-youtube" />
          </a>
        )
      }

      {
        socialMedia?.pinterest && (
          <a href={`https://pinterest.com/${socialMedia?.pinterest}`} target="_blank" rel="noreferrer">
            <i className="uil uil-pinterest" />
          </a>
        )
      }
    </nav>
  );
}
