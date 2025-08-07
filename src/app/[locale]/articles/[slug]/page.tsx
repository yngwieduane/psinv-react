
import { neon } from '@neondatabase/serverless';

export default async function ArticleSingle({
    params
}:{
    params: Promise<{slug:string;}>;
}){
    async function create(formData: FormData) {
        'use server';
        const sql = neon(`${process.env.DATABASE_URL}`);
        const comment = formData.get('comment');
        await sql`INSERT INTO comments (comment) VALUES (${comment})`;
    }
    const {slug} = await params;
    return (
        <>
            Article single {slug}

            <form action={create}>
                <input type="text" placeholder="write a comment" name="comment" />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}