import React from 'react'
import {Table, TBody, TR, TD} from 'oy-vey'

import EmptySpace from 'templates/components/EmptySpace'


export default (props) => {
  return (
    <Table width="100%">
      <TBody>
        <TR>
          <TD >
            <EmptySpace height={10} />
            {props.children}
            <EmptySpace height={10} />
          </TD>
        </TR>
      </TBody>
    </Table>
  )
}
