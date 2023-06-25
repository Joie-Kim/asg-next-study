import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '../components/Seo';

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (title) => {
    router.push(`/movies/${title}`);
  };
  return (
    <div className='container'>
      <Seo title='Home' />
      {results?.map((category, idx) => (
        <div
          onClick={() => onClick(category.list_name_encoded)}
          className='category'
          key={idx}
        >
          <h4>
            <Link href={`/movies/${category.list_name_encoded}`}>
              <a>{category.display_name}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .category {
          cursor: pointer;
        }
        .category:hover {
          transform: scale(1.05) translateY(-10px);
        }
        .category h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`https://books-api.nomadcoders.workers.dev/lists`)
  ).json();
  return {
    props: {
      results: results ?? [],
    },
  };
}
