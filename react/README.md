# React bindings for Type-r models.

## Use Type-R model and collection in React functional component

```javascript
const StatefulComponent = () => {
    const user = useModel( User ),
        roles = useCollectionOf( Role );

    const isReady = useIO( () =>
        Promise.all([
            user.fetch(),
            roles.fetch()
        ]
    );

    return isReady ?
        <ShowModel model={ user } roles={ roles } /> :
        <div> Loading... </div>
}
```