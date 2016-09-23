import React from 'react'
import {Table, TBody, TR, TD, A} from 'oy-vey'

import EmptySpace from 'templates/components/EmptySpace'

export default (props) =>
{
  const {name, link, alt} = props
  return (
    <Table width="400">
      <TBody>
        <TR>
          <TD>
            <EmptySpace height={10} />
            <A
              href={link}
              className="btn">
              {name}
            </A>
            { alt &&
            <span>
              <EmptySpace height={5} />
              <p style={{fontStyle: 'italic', color: '#46464678', fontSize: '15px'}}>
                click the link or go directly to <a href={link}>{link}</a>
              </p>
            </span> }
            <EmptySpace height={10} />
          </TD>
        </TR>
      </TBody>
    </Table>
  )
}

