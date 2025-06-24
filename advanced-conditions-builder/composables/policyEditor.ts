import type { Condition, PolicyMain } from "~/components/ConditionsEditor/types";

export function usePolicyEditor() {
	const PolicyMain = useState<PolicyMain>('PolicyMain', () => ({
		id: crypto.randomUUID(),
		operator: 'AND',
		conditions: [
			{
				id: crypto.randomUUID(),
				type: 'rule',
				rule: {
					action: null,
					property: null,
					value: ''
				},
				conditions: []
			}
		]
	}))

	function addRule(objParent: Condition | PolicyMain) {
		console.log('add-rule', objParent);
		objParent.conditions.push({
			id: crypto.randomUUID(),
			type: 'rule',
			rule: {
				action: null,
				property: null,
				value: ''
			},
			conditions: []
		})
	}

	function addGroup(objParent: Condition | PolicyMain) {
		objParent.conditions.push({
			id: crypto.randomUUID(),
			type: 'group',
			operator: 'AND',
			conditions: []
		})
	}

	return {
		addGroup,
		addRule,
		PolicyMain
	}
}