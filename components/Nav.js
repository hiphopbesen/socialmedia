import Link from 'next/link'
export default function Nav() {
    return (
      <nav>
        <ul>
          <li>
            <Link href="/"><strong>Lucas Shitposting Page</strong></Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/login">Profil</Link>
          </li>
          
        </ul>
      </nav>
    );
}