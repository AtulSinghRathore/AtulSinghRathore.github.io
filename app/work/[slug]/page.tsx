interface Props {
  params: { slug: string }
}

export default function WorkCase({ params }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Case study: {params.slug}
    </div>
  )
}
