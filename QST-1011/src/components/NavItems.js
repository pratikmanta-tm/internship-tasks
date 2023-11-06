import navdata from '../navbar.json';

export default function NavItems({ classname }) {
    return (
      <>
        {navdata.map((item, index) => (
          <a key={index} href={item.href}>
            <li className={classname}>{item.header.toUpperCase()}</li>
          </a>
        ))}
      </>
    );
}