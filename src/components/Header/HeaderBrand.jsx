import React from 'react'
import { Header } from './Header'
import { Four, One, Three, Two } from './Temp'

import './header-config.scss'

const THEME = {
  dark: 'dark',
  light: 'light',
}

export const HeaderBrand = () => {
  // * do any api driven work at root to provide to render components

  const CONFIG = {
    theme: {
      desktop: {
        active: THEME.light,
        inactive: THEME.light,
        topOfPage: THEME.dark, // * this needs to be a passed AEM config since most pages will be 'light' theme by default
      },
      mobile: {
        active: THEME.dark,
        inactive: THEME.light,
        topOfPage: THEME.dark,
      },
    },
    transitionDurationMs: 300,
  }

  const primaryMenu = {
    items: [
      {
        type: 'primary',
        displayType: 'drawer',
        label: 'one',
        path: '/one',
        render: () => <One />,
      },
      {
        type: 'primary',
        displayType: 'drawer',
        label: 'two',
        path: '/two',
        render: () => <Two />,
      },
      {
        type: 'primary',
        displayType: 'drawer',
        label: 'three',
        path: '/three',
        render: () => <Three />,
      },
      {
        type: 'primary',
        displayType: 'drawer',
        label: 'four',
        path: '/four',
        render: () => <Four />,
      },
    ],
  }

  const secondaryMenu = {
    items: [
      {
        type: 'secondary',
        displayType: 'drawer',
        label: '(1)',
        path: '/one',
        render: () => <One />,
      },
      {
        type: 'secondary',
        displayType: 'sidebar',
        label: '(2)',
        path: '/two',
        render: () => <Two />,
      },
      {
        type: 'secondary',
        displayType: 'sidebar',
        label: '(3)',
        path: '/three',
        render: () => <Three />,
      },
    ],
  }

  const mobileMenu = {
    label: 'mobile menu',
    id: 0,
    items: [
      {
        id: 1,
        label: 'one',
        items: [
          { id: 11, label: 'one-one', path: '/#' },
          { id: 12, label: 'one-two', path: '/#' },
        ],
      },
      {
        id: 2,
        label: 'two',
        items: [
          { id: 21, label: 'two-one', path: '/#' },
          { id: 22, label: 'two-two', path: '/#' },
          {
            id: 23,
            label: 'two-three',
            items: [
              { id: 231, label: 'two-three-one', path: '/#' },
              { id: 232, label: 'two-three-two', path: '/#' },
              {
                id: 233,
                label: 'two-three-three',
                render: () => <Two />,
              },
            ],
          },
          { id: 24, label: 'two-four', path: '/#' },
        ],
      },
    ],
  }

  const menus = {
    primary: primaryMenu,
    secondary: secondaryMenu,
    mobile: mobileMenu,
  }

  return <Header menu={menus} config={CONFIG} />
}

// ! FOR DEVELOPMENT
export const HeaderApp = () => {
  return (
    <>
      <HeaderBrand />
      <main>
        <div className='lorem-block'>
          <h1>test</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero quam
            neque fugiat totam exercitationem autem maiores, ipsa accusamus in
            earum, sint, hic et! Similique quos necessitatibus expedita itaque
            ratione, nostrum voluptatibus nisi dignissimos labore soluta tempora
            quod suscipit possimus, fuga odit veniam corporis ut quisquam quia
            magnam veritatis facilis consequatur numquam! Fugit aspernatur
            nesciunt asperiores similique vero, sed est in quisquam voluptatum
            libero eligendi quos, ea ut veritatis voluptatibus minima quod error
            praesentium! Assumenda, iusto. Nulla neque molestiae inventore porro
            dolore voluptatum non magnam, praesentium ab nihil. Nobis illo
            beatae officiis maiores odit cumque, recusandae voluptas nisi
            aliquid praesentium. Temporibus quos fugiat nemo, optio rem ipsum
            alias blanditiis, dolorem perspiciatis a provident iusto molestias
            facere itaque non eius officiis impedit, ipsa nihil in cum
            repellendus! Molestias dicta aspernatur facere, facilis similique
            labore, consectetur commodi asperiores ex a officia! Saepe ducimus
            assumenda, voluptatem ea quaerat quasi dignissimos quam nisi?
            Delectus inventore ducimus dolores maiores odio nulla sint, tempora
            necessitatibus soluta ab doloribus sed eaque voluptas provident
            dolore praesentium, quasi et consequuntur aperiam sapiente accusamus
            excepturi eveniet recusandae ipsam! Ipsam optio praesentium
            accusamus voluptatibus deleniti? Officiis reprehenderit atque, autem
            laboriosam, maxime alias rerum eligendi magnam quia quod suscipit.
            Sit, aspernatur. Quidem, perferendis.
          </p>
        </div>
        <div className='lorem-block'>
          <h1>test</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero quam
            neque fugiat totam exercitationem autem maiores, ipsa accusamus in
            earum, sint, hic et! Similique quos necessitatibus expedita itaque
            ratione, nostrum voluptatibus nisi dignissimos labore soluta tempora
            quod suscipit possimus, fuga odit veniam corporis ut quisquam quia
            magnam veritatis facilis consequatur numquam! Fugit aspernatur
            nesciunt asperiores similique vero, sed est in quisquam voluptatum
            libero eligendi quos, ea ut veritatis voluptatibus minima quod error
            praesentium! Assumenda, iusto. Nulla neque molestiae inventore porro
            dolore voluptatum non magnam, praesentium ab nihil. Nobis illo
            beatae officiis maiores odit cumque, recusandae voluptas nisi
            aliquid praesentium. Temporibus quos fugiat nemo, optio rem ipsum
            alias blanditiis, dolorem perspiciatis a provident iusto molestias
            facere itaque non eius officiis impedit, ipsa nihil in cum
            repellendus! Molestias dicta aspernatur facere, facilis similique
            labore, consectetur commodi asperiores ex a officia! Saepe ducimus
            assumenda, voluptatem ea quaerat quasi dignissimos quam nisi?
            Delectus inventore ducimus dolores maiores odio nulla sint, tempora
            necessitatibus soluta ab doloribus sed eaque voluptas provident
            dolore praesentium, quasi et consequuntur aperiam sapiente accusamus
            excepturi eveniet recusandae ipsam! Ipsam optio praesentium
            accusamus voluptatibus deleniti? Officiis reprehenderit atque, autem
            laboriosam, maxime alias rerum eligendi magnam quia quod suscipit.
            Sit, aspernatur. Quidem, perferendis.
          </p>
        </div>
        <div className='lorem-block'>
          <h1>test</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero quam
            neque fugiat totam exercitationem autem maiores, ipsa accusamus in
            earum, sint, hic et! Similique quos necessitatibus expedita itaque
            ratione, nostrum voluptatibus nisi dignissimos labore soluta tempora
            quod suscipit possimus, fuga odit veniam corporis ut quisquam quia
            magnam veritatis facilis consequatur numquam! Fugit aspernatur
            nesciunt asperiores similique vero, sed est in quisquam voluptatum
            libero eligendi quos, ea ut veritatis voluptatibus minima quod error
            praesentium! Assumenda, iusto. Nulla neque molestiae inventore porro
            dolore voluptatum non magnam, praesentium ab nihil. Nobis illo
            beatae officiis maiores odit cumque, recusandae voluptas nisi
            aliquid praesentium. Temporibus quos fugiat nemo, optio rem ipsum
            alias blanditiis, dolorem perspiciatis a provident iusto molestias
            facere itaque non eius officiis impedit, ipsa nihil in cum
            repellendus! Molestias dicta aspernatur facere, facilis similique
            labore, consectetur commodi asperiores ex a officia! Saepe ducimus
            assumenda, voluptatem ea quaerat quasi dignissimos quam nisi?
            Delectus inventore ducimus dolores maiores odio nulla sint, tempora
            necessitatibus soluta ab doloribus sed eaque voluptas provident
            dolore praesentium, quasi et consequuntur aperiam sapiente accusamus
            excepturi eveniet recusandae ipsam! Ipsam optio praesentium
            accusamus voluptatibus deleniti? Officiis reprehenderit atque, autem
            laboriosam, maxime alias rerum eligendi magnam quia quod suscipit.
            Sit, aspernatur. Quidem, perferendis.
          </p>
        </div>
      </main>
    </>
  )
}
