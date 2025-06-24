<script setup lang="ts">
import type { PolicyMain, Condition } from '@/components/ConditionsEditor/types'

const { addRule, addGroup } = usePolicyEditor()

const props = defineProps<{
	policyMain: PolicyMain;
}>()

const emit = defineEmits<{
	(e: 'add-rule', objParent: Condition | PolicyMain): void;
	(e: 'add-group', objParent: Condition | PolicyMain): void;
}>()

const selectedCondition = ref<('add-rule' | 'add-group' | '')>('');

watch(() => selectedCondition.value, (newVal) => {
	if (newVal === 'add-rule') {
		console.log('add-rule', props.policyMain);
		addRule(props.policyMain)
		// emit('add-rule', props.policyMain);
		nextTick(() => {
			selectedCondition.value = '';
		})
	} else if (newVal === 'add-group') {
		// emit('add-group', props.policyMain);
		addGroup(props.policyMain)
		nextTick(() => {
			selectedCondition.value = '';
		})
	}
})

function removeCondition(condition: Condition) {
	props.policyMain.conditions = props.policyMain.conditions.filter(c => c !== condition);
}
</script>

<template>
	<div class="w-full flex items-center ps-2">
		<div class="conditions-operator flex items-center">
			<select v-model="policyMain.operator" class="border py-1 px-2 rounded-sm text-sm">
				<option value="AND">AND</option>
				<option value="OR">OR</option>
			</select>
			<hr class="border-t w-5">
		</div>
		<div class="conditions-box border-l flex flex-col gap-4">
			<div v-for="condition in policyMain.conditions" class="condition-item flex items-center">
				<hr class="border-t w-5">
				<div v-if="condition.type === 'rule'" class="ps-2 flex gap-2">
					<div v-if="condition.rule" class="flex items-center gap-2">
						<select v-model="condition.rule.property" class="border py-1 px-2 rounded-sm text-sm">
							<option disabled selected>Property</option>
							<option value="email">email</option>
							<option value="username">username</option>
							<option value="phone">phone</option>
						</select>
						<select v-model="condition.rule.action" class="border py-1 px-2 rounded-sm text-sm">
							<option disabled selected>Action</option>
							<option value="contains">Contains</option>
							<option value="not-contains">Does't Contain</option>
							<option value="equals-to">Equals To</option>
						</select>
						<input type="text" placeholder="rule" v-model="condition.rule.value"
							class="border py-1 px-2 rounded-sm text-sm">
					</div>
					<button @click="removeCondition(condition)" class="cursor-pointer">
						<Icon name="lucide:circle-x" class="w-5 h-5" />
					</button>
				</div>
				<div v-if="condition.type === 'group'" class="group-container flex items-center gap-6">
					<ConditionsEditorGroup class="ps-0" :policy-main="(condition as PolicyMain)"
						@add-rule="emit('add-rule', condition)" @add-group="emit('add-group', condition)" />
					<button @click="removeCondition(condition)" class="cursor-pointer delete-btn">
						<Icon name="lucide:circle-x" class="w-5 h-5" />
					</button>
				</div>
			</div>
			<div class="condition-item flex items-center">
				<hr class="border-t w-5">
				<div class="ps-2 flex gap-2">
					<select v-model="selectedCondition" class="border py-1 px-2 rounded-sm text-sm">
						<option disabled value="" class="flex items-center gap-2">
							Add
						</option>
						<option value="add-rule">Condition</option>
						<option value="add-group">Conditions Group</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.condition-item:first-child,
.condition-item:last-child {
	position: relative;
	z-index: 1;

	&::before {
		position: absolute;
		content: '';
		top: 0px;
		bottom: auto;
		left: -1px;
		width: 2px;
		height: 49%;
		background-color: white;
	}
}

.condition-item:last-child {
	&::before {
		top: auto;
		bottom: 0px;
	}
}

.condition-item:last-child:first-child {
	&::before {
		top: 0px;
		bottom: auto;
	}

	&::after {
		position: absolute;
		content: '';
		left: -1px;
		width: 2px;
		height: 49%;
		background-color: white;
		top: auto;
		bottom: 0px;
	}
}

.group-container {
	position: relative;

	&::after {
		// position: absolute;
		// content: '';
		// right: 25px;
		// border-inline-end: 1px dashed black;
		// border-radius: 10px;
		// width: 10px;
		// height: 100%;
		// top: 0;
		// bottom: 0px;
	}
}

.delete-btn {
	position: absolute;
	top: auto;
	bottom: auto;
	margin-inline-start: -14px;
	margin-top: 3px;
	background: white;
	border-radius: 100px;
	width: 16px;
	height: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>