import { useEffect, useState } from "react";
import { getDevices } from "../services/deviceService";
import { getTelemetry } from "../services/TelemetryService";
// import { getTelemetry } from "../services/telemetryService";
function Dashboard() {

    const [devices, setDevices] = useState([]);
const [telemetry, setTelemetry] = useState([]);
    useEffect(() => {

        loadDevices();

    }, []);

    const loadTelemetry = async (deviceId) => {

    try {

        const response = await getTelemetry(deviceId);

        console.log(response.data);

        setTelemetry(response.data);

    } catch (error) {

        console.error(error);

    }

};

    const loadDevices = async () => {

        try {

            const response = await getDevices();

            console.log(response.data);

            setDevices(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (
    <div>

        <h1>Enterprise IIoT Dashboard</h1>

        <hr />

        <h2>Devices (PostgreSQL)</h2>

        <table border="1" cellPadding="10">

            <thead>

                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Telemetry</th>
                </tr>

            </thead>

            <tbody>

                {devices.map(device => (

                    <tr key={device.id}>

                        <td>{device.id}</td>
                        <td>{device.deviceName}</td>
                        <td>{device.deviceType}</td>
                        <td>{device.status}</td>

                        <td>
                            <button onClick={() => loadTelemetry(device.id)}>
                                View Telemetry
                            </button>
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

        <br />

        <h2>Cassandra Telemetry</h2>

        <table border="1" cellPadding="10">

            <thead>

                <tr>
                    <th>Timestamp</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                </tr>

            </thead>

            <tbody>

                {telemetry.map((t, index) => (

                    <tr key={index}>
                        <td>{t.key.ts}</td>
                        <td>{t.temperature}</td>
                        <td>{t.humidity}</td>
                    </tr>

                ))}

            </tbody>

        </table>

    </div>
);
}

export default Dashboard;