
import type { Metadata } from 'next'
import FAQPage from './_components/FAQPage'

type Props = {
    params: Promise<{ slug: string }>
}
export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    // read route params
    const { slug } = await params
    return {
        title: slug,
    }
}

export default async function Page({ params }: Props) {

    const { slug } = await params;

    return (
        <>
            <FAQPage slug={slug} />
        </>
    );
}