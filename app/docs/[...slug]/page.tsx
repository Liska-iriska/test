// app/docs/[...slug]/page.tsx

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div>
      <h1>Docs page</h1>
      <p>Current path: {slug?.join(' / ') || 'home'}</p>
    </div>
  );
}

// Що буде при переході на:

// /docs → params.slug = []
// /docs/setup → params.slug = ['setup']
// /docs/setup/install → params.slug = ['setup', 'install']
