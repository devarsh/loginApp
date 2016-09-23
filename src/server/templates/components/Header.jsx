import React from 'react'
import {Table, TBody, TD, TR, A} from 'oy-vey'

import EmptySpace from 'templates/components/EmptySpace'


const Header = (props) => {
  const style = {
    color: props.color,
    fontWeight: 'bold'
  }

  return (
    <Table
      width="100%"
      height="125"
      color={props.color}>
      <TBody>
        <TR>
          <TD>
            <EmptySpace height={10} />
            {/* Text area, could be another component, i.e. HeroText */}
            <Table width="100%">
              <TBody>
                <TR>
                  <TD with="100px"
                    align="center"
                    style={{color: props.color, fontFamily: 'Arial'}}>
                    <A href="https://simpleicons.org/icons/microsoftonenote.svg" title="Microsoft OneNote">
                      <img width="40px"
                      style={{ maxHeight: '73px', width:'40px' }}
                      alt=""
                      src="https://ci5.googleusercontent.com/proxy/aNKQ4ObTCLtT_qj4cDRHvJqw8Qrc_cieALcGfOUMjab0zkHZnJm5aLUWr8x4u6Ub5sUiX43E-f0eKasehK-l5kjxFHPyT1CYwMZGEK8SCTIwJD0N_7v5n1UHvD02d_g=s0-d-e1-ft#https://cf.dropboxstatic.com/static/images/emails/glyph/glyph_34%402x.png" />
                    </A>
                  </TD>
                </TR>
              </TBody>
            </Table>
            <EmptySpace height={5} />
          </TD>
        </TR>
      </TBody>
    </Table>
  )
}

Header.propTypes = {
  color: React.PropTypes.string.isRequired
}


export default Header
