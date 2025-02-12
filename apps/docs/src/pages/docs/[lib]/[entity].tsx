import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { DeclarationReflection } from "typedoc/dist/lib/models/reflections/declaration";
import { LayoutWrapper } from "../../../components/LayoutWrapper";
import { Qualities } from "../../../components/quality/Qualities";
import { QualityCard } from "../../../components/quality/QualityCard";
import fetchDocs from "../../../lib/loader";
import type { Entity } from "../../../lib/types";
import { getUnscopedPackageName } from "../../../lib/util";

type Props = {
	entity: Entity;
	lib: string;
};
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
	const { lib, entity } = ctx.params as { entity: string; lib: string };

	const docs = fetchDocs();
	const entityLookup = docs.children!.find((x) => x.name === lib || x.name === `@guildedjs/${lib}`)!.children!.find((x) => x.name === entity);
	if (!entityLookup) return { notFound: true };
	const typeEntityNarrow = entityLookup.type?.type === "reflection" ? entityLookup.type?.declaration : null;

	const entityRes = (typeEntityNarrow ?? entityLookup);
	const properties = (entityRes.children?.filter((x) => x.kind === 1_024) ?? []) as DeclarationReflection[];
	const accessors = (entityRes.children?.filter((x) => x.kind === 262_144) ?? []) as DeclarationReflection[];
	const methods = (entityRes.children?.filter((x) => x.kind === 2_048) ?? []) as DeclarationReflection[];
	const constructors = (entityRes.children?.filter((x) => x.kind === 512) ?? []) as DeclarationReflection[];

	return { props: { entity: { name: entityLookup.name, properties, accessors, methods, constructors }, lib } };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const docs = fetchDocs();
	return {
		paths: docs.children!.flatMap((x) => x.children!.map((y) => ({ params: { lib: getUnscopedPackageName(x.name), entity: y.name } }))),
		fallback: false, // can also be true or 'blocking'
	};
};

const DocksEntity: NextPage<Props> = ({ entity, lib }) => {
	const qualities: Record<string, DeclarationReflection[]> = {
		// eslint-disable-next-line @typescript-eslint/require-array-sort-compare
		"properties": [...entity.accessors, ...entity.properties].sort((a, b) => a.name > b.name ? 1 : -1),
		"methods": [...entity.methods],
	};

	const keys = Object.keys(qualities);
	const totalCount = keys.reduce((prev, curr) => prev + qualities[curr].length, 0)

	return <LayoutWrapper>
		<div className="my-8 md:ml-20 text-white grid grid-cols-none gap-8">
			{!totalCount && <h2 className="text-guilded text-xl pb-80">This entity does not have any properties, methods. The value is likely "never".</h2>}
			{keys.map(x => <Qualities key={x} name={x} qualities={qualities[x]} />)}
		</div>
		<div className="flex justify-center">
			<hr className="w-1/2 h-px bg-guilded border-0" />
		</div>
		<div className="grid place-content-center mt-32 space-y-4">
			{keys.map(qualityKey => qualities[qualityKey].map(quality => <QualityCard key={quality.name} lib={lib} quality={quality} />))}
		</div>
	</LayoutWrapper>
};

export default DocksEntity;
