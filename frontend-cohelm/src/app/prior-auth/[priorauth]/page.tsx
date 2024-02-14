import PriorAuth from "@/components/PriorAuth";

export default function PriorAuthPage({ params }: { params: { priorauth: number } }) {
  return <PriorAuth id={params.priorauth}/>
}

