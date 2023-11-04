import React from 'react'
import './groupSection.css'

function GroupCard(props){
  return (
    <>
      <div style={props.id === props.selectedGroup ? {background: "#F7ECDC"}:{background:"white"} } className='groupCard'
       onClick={() => {props.setSelectedGroup(props.id)} }>
        <div style={{background:props.groupIconColor}} className='groupIcon'>
            {props.name.slice(0,2).toUpperCase()}
        </div>
        <div className='groupName'>
            {props.name}
        </div>
      </div>
    </>
  )
}


export default function GroupsSection(props) {
  return (
    <section className='notesGroup'>
        <div className='groupListTopSection'>
            <h2 className='appHeading'>Pocket Notes</h2>
            <button onClick={ () => {props.setShowCreateGroupForm(true);
            }} className='createGroupBtn'>	<i className="fa fa-plus"></i> Create Notes Group</button>
        </div>
    
        <div className='groupListSection'>
          {
            props.all_groups.map((group) => (
              <GroupCard key={group.id} id={group.id} name={group.name} groupIconColor={group.color} selectedGroup={props.selectedGroup} setSelectedGroup={props.setSelectedGroup}/>
            ))
          }
        </div>
    </section>
  )
}
