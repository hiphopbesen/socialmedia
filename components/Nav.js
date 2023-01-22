import Link from 'next/link'
export default function Nav() {
    return (
      <nav>
        <ul>
          <li>
            <strong>Lucas Shitposting Page</strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/login">Profil</Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    );
}