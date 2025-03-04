import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, {  StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search: query || null}
const session = await auth()
console.log(session?.id)

const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})
//   const posts = [{
//     _createdAt: new Date(),
//     views: 55,
//     author: {_id: 1, name: 'sagar'},
//     _id:1,
//     description:'this is a description',
//     image:"https://www.pixartprinting.co.uk/blog/wp-content/uploads/2024/11/STARTUP-2.jpeg",
//     category:"Robots",
//     title: "we robots",
//   },
// ]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Enterpreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitch and Get Noticed in VC
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query? `search result for "${query}` : 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ?(
            posts.map((post: StartupTypeCard) =>(
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startup Found</p>
          )
        
        }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}

//