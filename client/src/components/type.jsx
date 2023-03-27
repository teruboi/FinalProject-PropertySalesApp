export default function Type({ type }) {

    switch (type) {
        case "tanah":
            return (
                <div className="propType bg-amber-300 border-amber-700 text-amber-700">TNH</div>
            )
        case "rumah":
            return (
                <div className="propType bg-lime-300 border-lime-700 text-lime-700">RMH</div>
            )
        case "apartment":
            return (
                <div className="propType bg-red-300 border-red-700 text-red-700">APT</div>
            )
        case "ruko":
            return (
                <div className="propType bg-blue-300 border-blue-700 text-blue-700">RUK</div>
            )
    }
}