import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Person = props => {

  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== loadedCharacter.id ||
  //     nextState.isLoading !== isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== props.selectedChar) {
  //     this.fetchData();
  //   }
  // }


  useEffect(() => {
    console.log('Component did update');
    fetchData();
    return() => {
      console.log('Cleaning up');
    }
  },[props.selectedChar]);

  // componentDidMount() {
  //   this.fetchData();
  // }

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          website: charData.website,
          email: charData.email
        };
        setIsLoading(false);
        setLoadedCharacter(loadedCharacter);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, [])

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          website={loadedCharacter.website}
          email={loadedCharacter.email}

        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
}

export default Person;
