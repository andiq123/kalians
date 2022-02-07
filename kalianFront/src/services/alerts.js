import { alerts } from '../stores';

export function oneAlertSuccess(message) {
	alerts.update((alerts) => [...alerts, { title: message, type: 'success' }]);
}
export function oneAlertInfo(message) {
	alerts.update((alerts) => [...alerts, { title: message, type: 'info' }]);
}

export function manyAlertsError(errors = []) {
	alerts.update((alerts) => [...alerts, ...errors.map((x) => ({ title: x, type: 'error' }))]);
}
